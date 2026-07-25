import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import { env } from '@/config/env';
import { StorageAdapter, StoredFile } from './StorageAdapter';

// Swappable local-disk implementation. To move to S3/Cloudinary later,
// implement StorageAdapter in a new class — no calling code changes.
export class LocalStorageAdapter implements StorageAdapter {
  private baseDir = env.UPLOAD_DIR;

  private async ensureDir(dir: string) {
    await fs.mkdir(dir, { recursive: true });
  }

  private datedFolder(entityType: string) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    return path.join(this.baseDir, entityType, String(yyyy), mm);
  }

  async saveImage(buffer: Buffer, originalName: string, entityType: string): Promise<StoredFile> {
    const folder = this.datedFolder(entityType);
    await this.ensureDir(folder);

    const ext = path.extname(originalName) || '.jpg';
    const fileName = `${uuid()}${ext}`;
    const thumbName = `${uuid()}-thumb${ext}`;

    const fullPath = path.join(folder, fileName);
    const thumbPath = path.join(folder, thumbName);

    // Compress full-size image and generate a thumbnail.
    await sharp(buffer).resize({ width: 1920, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(fullPath);
    await sharp(buffer).resize({ width: 400, withoutEnlargement: true }).jpeg({ quality: 75 }).toFile(thumbPath);

    return { fileName, path: fullPath, thumbnailPath: thumbPath };
  }

  async saveDocument(buffer: Buffer, originalName: string, entityType: string): Promise<StoredFile> {
    const folder = this.datedFolder(entityType);
    await this.ensureDir(folder);

    const ext = path.extname(originalName) || '.pdf';
    const fileName = `${uuid()}${ext}`;
    const fullPath = path.join(folder, fileName);

    await fs.writeFile(fullPath, buffer);
    return { fileName, path: fullPath };
  }

  async delete(filePath: string): Promise<void> {
    await fs.unlink(filePath).catch(() => undefined);
  }
}

export const storageAdapter = new LocalStorageAdapter();

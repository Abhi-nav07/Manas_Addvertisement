export interface StoredFile {
  fileName: string;
  path: string;
  thumbnailPath?: string;
}

export interface StorageAdapter {
  saveImage(buffer: Buffer, originalName: string, entityType: string): Promise<StoredFile>;
  saveDocument(buffer: Buffer, originalName: string, entityType: string): Promise<StoredFile>;
  delete(path: string): Promise<void>;
}

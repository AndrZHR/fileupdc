// file-uploader.js

class FileUploader {
  constructor(config) {
    this.inputElement = null;
    this.uploadUrl = config.uploadUrl || '/upload';
    this.maxFileSize = config.maxFileSize || 10 * 1024 * 1024; // 10 MB default
    this.allowedFileTypes = config.allowedFileTypes || ['image/jpeg', 'image/png', 'image/gif'];
    this.onUploadSuccess = config.onUploadSuccess || (() => {});
    this.onUploadError = config.onUploadError || (() => {});
    
    this.init();
  }
  
  init() {
    this.createInputElement();
    this.attachEventListeners();
  }
  
  createInputElement() {
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'file';
    this.inputElement.style.display = 'none';
    document.body.appendChild(this.inputElement);
  }
  
  attachEventListeners() {
    this.inputElement.addEventListener('change', this.handleFileSelect.bind(this));
  }
  
  handleFileSelect(event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (file.size > this.maxFileSize) {
      this.onUploadError('File size exceeds the maximum allowed size');
      return;
    }
    
    if (!this.allowedFileTypes.includes(file.type)) {
      this.onUploadError('File type not supported');
      return;
    }
    
    this.uploadFile(file);
  }
  
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    fetch(this.uploadUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Upload failed');
      }
    })
    .then(data => {
      this.onUploadSuccess(data);
    })
    .catch(error => {
      this.onUploadError(error.message);
    });
  }
  
  openFileSelector() {
    this.inputElement.click();
  }
}

// Export the FileUploader class for use in other modules
module.exports = FileUploader;

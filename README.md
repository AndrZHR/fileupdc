# FileUpdc

A reusable file uploader component for JavaScript applications.

## Installation

You can install the package via npm:

```bash
npm install fileupdc
```

## Usage

To use the file uploader component, simply import it into your JavaScript code:

```javascript
import FileUpdc from 'fileupdc';

// Use FileUpdc component in your application
```

## Features

- Supports uploading files to a server
- Customizable UI and functionality
- Drag-and-drop support
- Progress tracking

## Example

```javascript
import FileUpdc from 'fileupdc';

const uploader = new FileUpdc({
  target: '#file-uploader',
  onUpload: (file) => {
    console.log('Uploaded file:', file);
  },
});

uploader.render();
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

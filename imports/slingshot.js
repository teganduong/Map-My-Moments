/* File upload restrictions for AWS  *
 * Only allow picures less than 10MB */
Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB
});

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  imports: [ButtonModule, CommonModule]
})
export class ImageCropperComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() image = '';  // The image input (Blob URL or base64)
  sanitizedUrl!: SafeUrl; // The sanitized version of the image URL
  cropper!: Cropper;

  @Output() imageSelected = new EventEmitter<string | null>();
  @Output() dialogClosed = new EventEmitter<void>();

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.sanitizeImage();
  }

  ngOnChanges(): void {
    this.sanitizeImage();
  }

  sanitizeImage() {
    // Sanitize the image URL so it's safe for binding
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngAfterViewInit() {
    // Ensure the image element is available before initializing the Cropper
    if (this.imageElement?.nativeElement) {
      this.initCropper();
    }
  }

  initCropper() {
    if (this.imageElement?.nativeElement) {
      const imageElement = this.imageElement.nativeElement;
      
      // Initialize the Cropper only after the image is available
      this.cropper = new Cropper(imageElement, {
        aspectRatio: 1,  // You can adjust this as needed
        viewMode: 1,
        guides: false,
        background: false,
        responsive: true,
        autoCropArea: 0.8,
        cropBoxResizable: true
      });
    } else {
      console.error('Image element not found.');
    }
  }

  crop() {
    // Ensure that the cropper is initialized
    if (this.cropper) {
      // Get the cropped canvas
      const croppedCanvas = this.cropper.getCroppedCanvas();

      if (croppedCanvas) {
        // Get the base64 image data from the cropped canvas
        const result = croppedCanvas.toDataURL();
        this.imageSelected.emit(result); // Emit the cropped image back to the parent component
        this.dialogClosed.emit(); // Notify the parent that the dialog is closed
      }
    } else {
      console.error('Cropper is not initialized.');
    }
  }

  reset() {
    // Reset the cropper to its original state
    if (this.cropper) {
      this.cropper.clear();
      this.cropper.crop();
    }
  }
}

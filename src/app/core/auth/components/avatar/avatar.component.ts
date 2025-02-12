import { Component, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ImageCropperComponent } from "../image-cropper/image-cropper.component";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [DialogModule, CommonModule, ImageCropperComponent],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AvatarComponent
    }
  ]
})
export class AvatarComponent implements OnInit, ControlValueAccessor {
  file = '';          // Store the image after crop
  dialogVisible = false;   // Control dialog visibility
  image = '';          // The image URL (Blob or base64) passed to the cropper

  private onChange = (fileUrl: string) => { console.log('Image changed'); };
  private onTouched = () => { console.log('Input touched'); };

  disabled = false;

  constructor() {
    console.log('dadad')

  }

  ngOnInit(): void {
    console.log('dadad')

  }

  writeValue(_file: string): void {
    this.file = _file;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      // Create a Blob URL from the selected file
      const _file = URL.createObjectURL(files[0]);
      this.resetInput();
      this.openAvatarEditor(_file);
    }
  }

  openAvatarEditor(image: string): void {
    this.dialogVisible = true;
    this.image = image;  // Set the image URL for cropping
  }

  onImageSelected(result: string | null): void {
    if (result) {
      this.file = result;
      this.onChange(this.file);  // Update form control with the new image URL
      this.dialogVisible = false; // Close the dialog after selection
    }
  }

  onDialogClose(): void {
    this.dialogVisible = false; // Close the dialog on cancel or outside click
  }
}

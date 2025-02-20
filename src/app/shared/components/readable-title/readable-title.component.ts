import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-readable-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './readable-title.component.html',
  styleUrl: './readable-title.component.scss'
})
export class ReadableTitleComponent implements AfterViewInit, OnDestroy {

  @Input() text: string | undefined = '';
  @Input() styleClass: string | undefined = '';
  @Input() imageId: string | undefined = ''; // Pass the imageId here

  textColor = 'black'; // Default color
  private observer: MutationObserver | undefined;
  private isInitialColorSet = false; // Flag to avoid flickering
  private isImageLoaded = false; // Flag to check if image is loaded

  constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Set initial text color based on background color immediately
    this.setInitialTextColor();

    // Observe the image element for changes to its source (in case the image changes)
    this.observer = new MutationObserver(() => this.updateTextColor());
    const imageElement = document.getElementById(this.imageId!) as HTMLImageElement;

    if (imageElement) {
      this.observer.observe(imageElement, {
        attributes: true,
        attributeFilter: ['src']
      });
    }

    // Update the view after initialization if needed
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setInitialTextColor() {
    const imageElement = document.getElementById(this.imageId!) as HTMLImageElement;

    if (imageElement) {
      // If the image is already loaded, directly calculate the text color
      if (imageElement.complete && imageElement.naturalHeight !== 0) {
        this.setTextColorFromImage(imageElement.src);
      } else {
        // Wait for image load
        imageElement.onload = () => this.setTextColorFromImage(imageElement.src);
      }
    }
  }

  private setTextColorFromImage(imageUrl: string) {
    this.getImageAverageColor(imageUrl).then(avgColor => {
      if (avgColor) {
        this.textColor = this.getContrastColor(avgColor);
        this.renderer.setStyle(this.el.nativeElement, 'color', this.textColor);
        this.isImageLoaded = true; // Image is loaded and color is set
      }
    });
  }

  private updateTextColor() {
    // Only update if the image is fully loaded
    if (this.isImageLoaded) {
      const imageElement = document.getElementById(this.imageId!) as HTMLImageElement;

      if (imageElement && imageElement.src) {
        this.getImageAverageColor(imageElement.src).then(avgColor => {
          if (avgColor) {
            this.textColor = this.getContrastColor(avgColor);
            this.renderer.setStyle(this.el.nativeElement, 'color', this.textColor);
          }
        });
      }
    }
  }

  private async getImageAverageColor(imageUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return resolve('rgb(255, 255, 255)'); // Fallback to white if no context

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Get the center pixel color for contrast
        const x = img.width / 2;
        const y = img.height / 2;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const avgColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

        resolve(avgColor);
      };

      img.onerror = () => resolve('rgb(255, 255, 255)'); // Fallback to white if image fails to load
    });
  }

  private getContrastColor(bgColor: string): string {
    const rgb = this.extractRGB(bgColor);
    if (!rgb) return 'black';

    // Standard luminance calculation for contrast
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    return luminance > 0.5 ? 'black' : 'white';
  }

  private extractRGB(color: string): number[] | null {
    if (color.startsWith('rgb')) {
      const match = color.match(/\d+/g);
      return match ? match.slice(0, 3).map(Number) : null;
    }
    return null;
  }
}

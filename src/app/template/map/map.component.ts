import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() address: string = '';
  private map: any;
  private L: any;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.L = await import('leaflet');
      this.initMap(); // Initialize map only once here
      if (this.address) {
        this.geocodeAddress(this.address);
      } else {
        // Default to Beni Suef, Egypt if no address is provided
        this.geocodeAddress('Beni Suef, Egypt');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platformId) && changes['address'] && this.address && this.map) {
      // Update map view when address changes, without reinitializing
      this.geocodeAddress(this.address);
    }
  }

  private initMap(): void {
    // Check if map is already initialized to avoid the error
    if (!this.map) {
      this.map = this.L.map('map-container', {
        center: [26.8206, 30.8025], // Default: Egypt (near Cairo)
        zoom: 6 // Broader view of Egypt initially
      });

      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    }
  }

  geocodeAddress(address: string) {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    this.http.get<any[]>(nominatimUrl).subscribe({
      next: (results) => {
        if (results && results.length > 0) {
          const { lat, lon } = results[0];
          const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
          this.map?.setView(coords, 12); // Update view to new coordinates
          // Clear existing markers and add new one
          this.map?.eachLayer((layer: any) => {
            if (layer instanceof this.L.Marker) {
              this.map?.removeLayer(layer);
            }
          });
          this.L.marker(coords).addTo(this.map!).bindPopup(address).openPopup();
        } else {
          console.error(`No geocoding results found for "${address}"`);
          const fallbackCoords: [number, number] = [30.0661, 31.0990]; // Beni Suef fallback
          this.map?.setView(fallbackCoords, 12);
          this.map?.eachLayer((layer: any) => {
            if (layer instanceof this.L.Marker) {
              this.map?.removeLayer(layer);
            }
          });
          this.L.marker(fallbackCoords).addTo(this.map!).bindPopup('Beni Suef, Egypt (Fallback)').openPopup();
        }
      },
      error: (err) => {
        console.error('Geocoding error:', err);
        const fallbackCoords: [number, number] = [29.0661, 31.0990];
        this.map?.setView(fallbackCoords, 12);
        this.map?.eachLayer((layer: any) => {
          if (layer instanceof this.L.Marker) {
            this.map?.removeLayer(layer);
          }
        });
        this.L.marker(fallbackCoords).addTo(this.map!).bindPopup('Beni Suef, Egypt (Error Fallback)').openPopup();
      }
    });
  }
}

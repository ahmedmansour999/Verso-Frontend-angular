import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() address: string = '';

  private map?: L.Map;
  private LRef: typeof L = L;
  private marker?: L.Marker;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // If you want to lazy load leaflet dynamically, you can replace this.LRef = L with dynamic import
      // e.g. this.LRef = await import('leaflet');
      this.initMap();
      if (this.address) {
        this.geocodeAddress(this.address);
      } else {
        this.geocodeAddress('Beni Suef, Egypt');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      isPlatformBrowser(this.platformId) &&
      changes['address'] &&
      this.address &&
      this.map
    ) {
      this.geocodeAddress(this.address);
    }
  }

  private initMap(): void {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
      console.error('Map container element not found');
      return;
    }

    if (!this.map) {
      this.map = this.LRef.map(mapContainer, {
        center: [26.8206, 30.8025], // Egypt center approx
        zoom: 6
      });

      this.LRef.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
          this.map?.setView(coords, 12);

          if (this.marker) {
            this.map?.removeLayer(this.marker);
          }

          this.marker = this.LRef.marker(coords).addTo(this.map!).bindPopup(address).openPopup();
        } else {
          console.error(`No geocoding results found for "${address}"`);
          this.setFallbackMarker();
        }
      },
      error: (err) => {
        console.error('Geocoding error:', err);
        this.setFallbackMarker();
      }
    });
  }

  private setFallbackMarker() {
    const fallbackCoords: [number, number] = [30.0661, 31.0990]; // Beni Suef fallback
    this.map?.setView(fallbackCoords, 12);

    if (this.marker) {
      this.map?.removeLayer(this.marker);
    }

    this.marker = this.LRef.marker(fallbackCoords).addTo(this.map!).bindPopup('Beni Suef, Egypt (Fallback)').openPopup();
  }
}

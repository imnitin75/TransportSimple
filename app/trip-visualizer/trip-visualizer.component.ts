import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Trip {
  from: string;
  to: string;
  level: number;
  continued: boolean;
}

@Component({
  selector: 'app-trip-visualizer',
  templateUrl: './trip-visualizer.component.html',
  styleUrls: ['./trip-visualizer.component.scss'],
})
export class TripVisualizerComponent {
  tripForm: FormGroup;
  trips: Trip[] = [];

  constructor(private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      from: [''],
      to: [''],
    });
  }

  addTrip() {
    const from = this.tripForm.value.from.toUpperCase().substring(0, 3);
    const to = this.tripForm.value.to.toUpperCase().substring(0, 3);
    const lastTrip = this.trips[this.trips.length - 1];

    // First trip treated as continued as per diagram
    let continued = true;
    let level = 1;

    if (lastTrip) {
      if (lastTrip.to === from) {
        continued = true;
      } else if (lastTrip.from === from && lastTrip.to === to) {
        level = 2;
      } else {
        continued = false;
      }
    }

    this.trips.push({ from, to, level, continued });
    this.tripForm.reset();
  }
}

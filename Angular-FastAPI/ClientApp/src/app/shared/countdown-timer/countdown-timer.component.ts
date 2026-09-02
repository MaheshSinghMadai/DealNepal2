import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() endTime!: string;

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  isExpired: boolean = false;
  private intervalId: any;

  ngOnInit(): void {
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateTimer(): void {
    if (!this.endTime) return;
    const end = new Date(this.endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
      this.isExpired = true;
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    } else {
      this.isExpired = false;
      this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }
}

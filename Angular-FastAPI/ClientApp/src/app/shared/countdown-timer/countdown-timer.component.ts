import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  template: `
    <div class="timer-badge" [class.expired]="isExpired">
      <i class="fa-regular fa-clock"></i>
      <span *ngIf="!isExpired">{{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s left</span>
      <span *ngIf="isExpired" class="text-rose-600 font-bold">AUCTION CLOSED</span>
    </div>
  `,
  styles: [`
    .timer-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #ffffff;
      border: 1px solid #fde68a;
      color: #b45309;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      font-family: var(--font-heading);
      letter-spacing: 0.02em;
      box-shadow: 0 2px 8px rgba(217, 119, 6, 0.15);
    }
    .timer-badge.expired {
      border-color: #fecdd3;
      color: #e11d48;
      background: #fff1f2;
      box-shadow: none;
    }
  `]
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

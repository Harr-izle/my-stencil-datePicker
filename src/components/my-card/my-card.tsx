import { Component, h, State, Event, EventEmitter, Listen, JSX } from "@stencil/core";

interface DayProps {
    day: number;
    isSelected: boolean;
    isEmpty?: boolean;
}

@Component({
    tag: 'my-card',
    styleUrl: 'my-card.css',
    shadow: true
})
export class MyCard {
    @State() currentDate: Date = new Date();
    @State() selectedDate: Date = null;
    @State() yearDropdownOpen: boolean = false;
    @Event() dateSelected: EventEmitter<Date>;

    private months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
    private weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    private readonly yearsToShow = 100; // Show 100 years in dropdown

    private getDaysInMonth(date: Date): number {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    private getFirstDayOfMonth(date: Date): number {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    private getYearsList(): Array<number> {
        const currentYear: number = new Date().getFullYear();
        const years: Array<number> = [];
        for (let i: number = currentYear - this.yearsToShow; i <= currentYear; i++) {
            years.push(i);
        }
        return years;
    }

    private handleDateClick(day: number): void {
        this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
        this.dateSelected.emit(this.selectedDate);
    }

    private handleYearClick(year: number): void {
        this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
        this.yearDropdownOpen = false;
    }

    private changeMonth(increment: number): void {
        this.currentDate = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() + increment,
            1
        );
    }

    private toggleYearDropdown(event: Event): void {
        event.stopPropagation();
        this.yearDropdownOpen = !this.yearDropdownOpen;
    }

    @Listen('click', { target: 'window' })
    handleClickOutside(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.year-selector')) {
            this.yearDropdownOpen = false;
        }
    }

    private renderDay({ day, isSelected, isEmpty = false }: DayProps): JSX.Element {
        if (isEmpty) {
            return <div class="day empty"></div>;
        }
        return (
            <div class={`day ${isSelected ? 'selected' : ''}`}
                 onClick={() => this.handleDateClick(day)}>
                {day}
            </div>
        );
    }

    render(): JSX.Element {
        const daysInMonth: number = this.getDaysInMonth(this.currentDate);
        const firstDay: number = this.getFirstDayOfMonth(this.currentDate);
        const days: JSX.Element[] = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(this.renderDay({ day: 0, isSelected: false, isEmpty: true }));
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected: boolean = this.selectedDate?.getDate() === day && 
                             this.selectedDate?.getMonth() === this.currentDate.getMonth() &&
                             this.selectedDate?.getFullYear() === this.currentDate.getFullYear();
            
            days.push(this.renderDay({ day, isSelected }));
        }

        return (
            <div class="datepicker-container">
                <h2 class="datepicker-title">Date Picker</h2>
                <div class="datepicker">
                    <div class="header">
                        <button class="nav-btn prev" onClick={() => this.changeMonth(-1)}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                        </button>
                        <div class="current-month">
                            <span class="month">{this.months[this.currentDate.getMonth()]}</span>
                            <div class="year-selector">
                                <span class={`year ${this.yearDropdownOpen ? 'active' : ''}`} 
                                      onClick={(e) => this.toggleYearDropdown(e)}>
                                    {this.currentDate.getFullYear()}
                                    <span class="dropdown-arrow">▼</span>
                                </span>
                                {this.yearDropdownOpen && (
                                    <div class="year-dropdown" onClick={(e) => e.stopPropagation()}>
                                        <div class="year-dropdown-content">
                                            {this.getYearsList().reverse().map(year => (
                                                <div 
                                                    class={`year-option ${year === this.currentDate.getFullYear() ? 'selected' : ''}`}
                                                    onClick={() => this.handleYearClick(year)}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button class="nav-btn next" onClick={() => this.changeMonth(1)}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="none" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="weekdays">
                        {this.weekDays.map(day => <div class="weekday">{day}</div>)}
                    </div>
                    <div class="days">
                        {days}
                    </div>
                </div>
            </div>
        );
    }
}
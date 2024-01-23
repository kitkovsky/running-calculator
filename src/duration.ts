export class Duration {
  hours: number
  minutes: number
  seconds: number

  constructor({
    hours = 0,
    minutes = 0,
    seconds = 0,
  }: {
    hours?: number
    minutes?: number
    seconds?: number
  }) {
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
  }

  toString(): string {
    const totalSeconds = this.hours * 60 * 60 + this.minutes * 60 + this.seconds
    const hours = Math.floor(totalSeconds / 60 / 60)
      .toString()
      .padStart(2, '0')
    const minutes = (Math.floor(totalSeconds / 60) % 60)
      .toString()
      .padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  add(durations: Partial<Duration>[]): Duration {
    return durations.reduce((acc: Duration, curr) => {
      return new Duration({
        hours: acc.hours + (curr.hours ?? 0),
        minutes: acc.minutes + (curr.minutes ?? 0),
        seconds: acc.seconds + (curr.seconds ?? 0),
      })
    }, this)
  }
}

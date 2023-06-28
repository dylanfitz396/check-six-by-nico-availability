import fetch from 'node-fetch'
import { sendEmail } from './sendEmail.js'

let emailSent = false

const fetchAvailability = async () => {
  const response = await fetch('https://booking.resdiary.com/api/Restaurant/SixByNicoEdinburgh/AvailabilitySearch?date=2023-07-04&covers=2&channelCode=ONLINE&areaId=0&availabilityType=Reservation')
  const jsonData = await response.json()
  const { TimeSlots } = jsonData
  return TimeSlots
}

const checkAvailability = async () => {
  const availability = await fetchAvailability()
  const suitableTimes = availability.filter(({ TimeSlot }) => {
    const date = new Date(TimeSlot)
    const hour = date.getHours()
    return (hour >= 19) && (hour < 21)
  })
  if (suitableTimes.length > 0) {
    sendEmail(suitableTimes);
    emailSent = true;
  }
}

const intervalId = setInterval(() => {
    if (emailSent) {
        clearInterval(intervalId);
    } else {
        checkAvailability();
    }
}, 60000)

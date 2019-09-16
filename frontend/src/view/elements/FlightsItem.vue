<script>
export default {
  components: {},
  props: {
    departureStation: { type: String, required: true },
    departureTime: { type: String, required: true },
    destinationStation: { type: String, required: true },
    arrivalTime: { type: String, required: true }
  },
  computed: {
    departureMonth() {
      const departureDate = new Date(this.departureTime);

      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ][departureDate.getMonth()];
    },
    departureDay() {
      const departureDate = new Date(this.departureTime);

      return departureDate.getDate();
    },
    flightDuration() {
      const { departureTime, arrivalTime } = this;
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const departureDate = new Date(departureTime);

      const departureTimeString =
        departureDate
          .getHours()
          .toString()
          .padStart(2, 0) +
        ":" +
        departureDate
          .getMinutes()
          .toString()
          .padStart(2, 0);

      const departureDay = dayNames[departureDate.getDay()];

      const arrivalDate = new Date(arrivalTime);

      const arrivalTimeString =
        arrivalDate
          .getHours()
          .toString()
          .padStart(2, 0) +
        ":" +
        arrivalDate
          .getMinutes()
          .toString()
          .padStart(2, 0);

      const arrivalDay = dayNames[arrivalDate.getDay()];

      return [
        departureDay,
        departureTimeString,
        "–",
        arrivalDay !== departureDay ? arrivalDay : null,
        arrivalTimeString
      ]
        .filter(truthy => truthy)
        .join(" ");
    }
  }
};
</script>

<template>
  <div class="flights-item__wrapper">
    <div class="flights-item__calendar">
      <div class="flights-item__month">{{ departureMonth }}</div>
      <div class="flights-item__day">{{ departureDay }}</div>
    </div>
    <div class="flights-item__text-wrapper">
      <div class="flights-item__departure">{{ departureStation }} -</div>
      <div class="flights-item__destination">{{ destinationStation }}</div>
      <div class="flights-item__duration">{{ flightDuration }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/view/variables.scss";

.flights-item__wrapper {
  padding: 15px;
  background-color: $white;

  display: flex;
  align-items: flex-start;
}

.flights-item__calendar {
  border: 2px solid $border-gray;
  border-radius: 3px;
}

.flights-item__month {
  background-color: $background-gray;

  width: 36px;
  height: 21px;

  font-family: Roboto;
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.flights-item__day {
  width: 36px;
  height: 21px;

  font-family: Roboto;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.flights-item__text-wrapper {
  margin: 0 12px;
}

.flights-item__departure,
.flights-item__destination {
  font-family: Roboto;
  font-weight: bold;
  font-size: 14px;
  line-height: 15px;
}

.flights-item__duration {
  margin-top: 4px;

  font-family: Roboto;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
}
</style>

/* global Module */

/* Magic Mirror
 * Module: MMM-doomsDay
 *
 * By Pierre Broberg
 * MIT Licensed.
 */

Module.register("MMM-doomsDay", {
    // Default module config.
    defaults: {
        doomsDay: "2018-03-01 24:00:00", // YYYY-MM-DD HH:MM:SS
        updateInterval: 60 * 60 * 1000,
        toWhat: "Leaving for Paris!",
        singular: "Day Left ",
        plural: "Days Left",
        present: "Let's Fly!",
        timesUp: "death and despair, your time is up."
    },

    // Define start sequence.
    start: function() {
        var self = this;

        Log.info("Starting module: " + this.name);

        if (this.config.updateInterval < 10 * 60 * 1000) {
            // 10 min minimum update interval
            this.config.updateInterval = 10 * 60 * 1000;
        }
        setInterval(function() {
            self.updateDom();
        }, this.config.updateInterval);
    },

    // Define required styles
    getStyles: function () {
        return ["MMM-doomsDay.css"];
    },

    // Override dom generator.
    getDom: function() {
        var doomsDay = new Date(this.config.doomsDay);
        var now = new Date();
        var timeparser = Date.parse(doomsDay) - Date.parse(now);
        daysLeft = Math.floor(timeparser/(1000*60*60*24));

        var wrapper = document.createElement("div");
        var headerD = document.createElement("span");
        headerD.innerHTML = this.config.toWhat + "</br>";
        headerD.className = "doooom";

        if (daysLeft == 0) {
            var timeLeft = document.createElement("span")
            timeLeft.innerHTML = this.config.present;
            timeLeft.className = "timeLeft";
          }

        else if (daysLeft == 1) {
          var timeLeft = document.createElement("span");
          timeLeft.innerHTML = daysLeft + " " + this.config.singular;
          timeLeft.className = "timeLeft";
          }
        else if (daysLeft >= 2) {
            var timeLeft = document.createElement("span");
            timeLeft.innerHTML = daysLeft + " " + this.config.plural;
            timeLeft.className = "timeLeft";
          }

        else {
          var timeLeft = document.createElement("span")
          timeLeft.innerHTML = this.config.timesUp;
          timeLeft.className = "timeEnded";
          headerD.innerHTML = "</BR>";
        }

        wrapper.appendChild(headerD);
        wrapper.appendChild(timeLeft);
        return wrapper;
    }
});

// Bandsintown URLs
const artistInfoUrl = '';
const upcomingEvents = '';
const pastEvents = '';

// Function to format date of upcoming and past events
const formatDate = (date) => {
    //Format day
    const date1 = new Date(date);
    let dayString = date1.getUTCDay();
    if (dayString === 0) {
        dayString = 'Sonntag';
    } else if (dayString === 1) {
        dayString = 'Montag';
    } else if (dayString === 2) {
        dayString = 'Dienstag';
    } else if (dayString === 3) {
        dayString = 'Mittwoch';
    } else if (dayString === 4) {
        dayString = 'Donnerstag';
    } else if (dayString === 5) {
        dayString = 'Freitag';
    } else {
        dayString = 'Samstag';
    }
    const dayNumber = date.slice(8, 10);
    
    //Format month
    let month = date.slice(5,7);
    switch (month) {
        case '01':
          month = 'Januar';
          break;
          case '02':
          month = 'Februar';
          break;
          case '03':
          month = 'März';
          break;
          case '04':
          month = 'April';
          break;
          case '05':
          month = 'Mai';
          break;
          case '06':
          month = 'Juni';
          break;
          case '07':
          month = 'Juli';
          break;
          case '08':
          month = 'August';
          break;
          case '09':
          month = 'September';
          break;
          case '10':
          month = 'Oktober';
          break;
          case '11':
          month = 'November';
          break;
          case '12':
          month = 'Dezember';
    }

    const year = date.slice(0,4);

    const time = date.slice(11, 16);

    return `${dayString}, ${dayNumber}. ${month} ${year} | ${time}`;
}

// Function to fetch and display the next 5 upcoming events

fetch(upcomingEvents)
.then(response => response.json())
.then(data => {
    console.log(data);
    if(data.length === 0) {
        const noConcerts = document.getElementById('noConcerts');
        noConcerts.innerHTML = "Keine bevorstehenden Konzerte."
    } else {
        console.log(data[0]);
        const upcomingConcerts = document.getElementById('upcomingConcerts');
        upcomingConcerts.style.display = "block";
        let i;
        for (i = 0; i <=9; i++) {
        if(!data[i]){
                break;
            } 
        console.log(i);
        const upcomingConcert = document.getElementById(`upcomingConcert${i}`);
        upcomingConcert.style.display = "flex";

        const lineupUpcomingConcert = document.getElementById(`lineupUpcomingConcert${i}`);
        const venueUpcomingConcert = document.getElementById(`venueUpcomingConcert${i}`);
        const timeUpcomingConcert = document.getElementById(`timeUpcomingConcert${i}`);
        
        lineupUpcomingConcert.innerHTML = data[i].lineup;
        console.log(data[i].lineup);
        venueUpcomingConcert.innerHTML = `${data[i].venue.name} | ${data[i].venue.city}, ${data[i].venue.country}`;
        timeUpcomingConcert.innerHTML = formatDate(data[i].datetime);

        const buttonUpcomingConcert = document.getElementById(`buttonUpcomingConcert${i}`)

        if(data[0].offers === 0) {
            buttonUpcomingConcert.setAttribute("onclick", `window.location.href='${data[i].url}'`);
        } else {
            buttonUpcomingConcert.innerHTML = "Tickets kaufen";
            buttonUpcomingConcert.setAttribute("onclick", `window.location.href='${data[i].offers[0].url}'`);
        }
        
        
    }
}
})


// Function to fetch and display the last 5 past events
fetch(pastEvents)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let i;
        for (i = 0; i <=4; i++) {
        const lineupPastConcert = document.getElementById(`lineupPastConcert${i}`);
        const venuePastConcert = document.getElementById(`venuePastConcert${i}`);
        const timePastConcert = document.getElementById(`timePastConcert${i}`);
        lineupPastConcert.innerHTML = data[i].lineup;
        venuePastConcert.innerHTML = `${data[i].venue.name} | ${data[i].venue.city}, ${data[i].venue.country}`;
        timePastConcert.innerHTML = formatDate(data[i].datetime);
    }
})

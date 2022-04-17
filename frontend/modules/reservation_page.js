import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const result = await fetch(config.backendEndpoint + '/reservations/')
    const data = await result.json()
    return data;
  }
  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
   
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  
 if(reservations.length==0){
  document.getElementById('no-reservation-banner').style.display='block';
  document.getElementById('reservation-table-parent').style.display='none';
  return;
   
 }
 
  
 reservations.forEach(element => {
  const adventureId =  element.adventure;
  console.log(adventureId)
  const  month= ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
   
   const booking = element.time;
   let bookingDateAndTimeArr = new Date(booking).toLocaleString().split(',');
   const bookingTime = bookingDateAndTimeArr[0];
   const bookingDate = bookingDateAndTimeArr[0].split('/');
  
   let bookingMonth;
   month.map((month,idx)=>{
       if(bookingDate[0]==(idx+1)){
         bookingMonth = month
       }
   })
   const bookingData = `${bookingDate[0]} ${bookingMonth} ${bookingDate[2]} ${bookingTime}`
   console.log('this is booking ', bookingData)
  
  //  action btn
  const actionBtn = `<a href="../detail/?adventure=${adventureId}" ><button class='reservation-visit-button'>Visit Adventure</button></a>`
   
   
   
   const d = element.date
   const text= new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' })
   const row= document.createElement('tr')
   row.innerHTML = `<td>${element.id}</td>
   <td>${element.name}</td>
   <td>${element.adventureName}</td>
   <td>${element.person}</td>
    <td>${text}</td>
   <td>${element.price}</td>
   <td>${bookingData}</td>
   <td>${actionBtn}</td>`
  document.getElementById('reservation-table').appendChild(row)
   
 });
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };

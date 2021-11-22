// Please implement your solution in this file
const url = "https://api.spacexdata.com/v3/launches/past";

export async function noop () {
  console.log('noop')
  let rockets = [];
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    rockets = await response.json();
  } catch (error) {
    console.error(error);
  }
  
  const nasaRockets = [];
  rockets.map((rocket, idx) => {
    const NASA = ["NASA (CRS)", "NASA", "NASA (CCtCap)", "NASA(COTS)"];
    rocket.launch_year === "2018" &&
    rocket.rocket.second_stage.payloads[0].customers.find((nasa) =>
      NASA.includes(nasa)
    )
      ? nasaRockets.push(rocket)
      : null;
  });
  let htmlData,
    data = []
  
  nasaRockets.sort(
    (a, b) => b.rocket.second_stage.block - a.rocket.second_stage.block
  ) &&
    nasaRockets.sort(
      (a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
    );
  
  Object.assign({}, nasaRockets);
  
  nasaRockets.map((nasaRocket) => {
    data.push(
      `{<br>"flight_number": ${nasaRocket.flight_number}<br>mission_name: ${nasaRocket.mission_name}<br>payloads_count: ${nasaRocket.rocket.second_stage.block} <br>} <br>`
    );
  });

  return data



}

export const noop1 =() => {
  console.log(noop1)
}
// module.exports = {
//   prepareData: noop,
//   renderData: noop
// };

//exports.noop = noop




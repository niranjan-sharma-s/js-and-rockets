const url = "https://api.spacexdata.com/v3/launches/past";
let spacexlaunches = [],
  nasaLaunches = [];

try {
  const response = await fetch(url, {
    method: "GET",
  });
  spacexlaunches = await response.json();
} catch (error) {
  throw error;
}

export const filterNasaLaunches = (allSpacexlaunches) => {
  return allSpacexlaunches.map((rocket, idx) => {
    const NASA = ["NASA (CRS)", "NASA", "NASA (CCtCap)", "NASA(COTS)"];
    rocket.launch_year === "2018" &&
      rocket.rocket.second_stage.payloads[0].customers.find((nasa) =>
        NASA.includes(nasa)
      ) &&
      nasaLaunches.push(rocket);
  });
};

filterNasaLaunches(spacexlaunches);

let data = [];

nasaLaunches.sort(
  (a, b) => b.rocket.second_stage.block - a.rocket.second_stage.block
) &&
  nasaLaunches.sort(
    (a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
  );

nasaLaunches.map((nasaRocket) => {
  data.push({
    flight_number: nasaRocket.flight_number,
    mission_name: nasaRocket.mission_name,
    payloads_count: nasaRocket.rocket.second_stage.block,
  });
});

document.getElementById("responseJSON").innerHTML = JSON.stringify(
  data,
  null,
  2
);

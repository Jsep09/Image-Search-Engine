const form = document.getElementById("form");
let dataFromUser = "";
form.addEventListener("input", (e) => {
  dataFromUser = e.target.value;
});

// Api
const getSerperRes = async () => {
  try {
    let data = JSON.stringify({
      q: dataFromUser,
      num: "9", // by default
    });
    let config = {
      method: "post",
      url: "https://google.serper.dev/images",
      headers: {
        "X-API-KEY": "d4f6bbaf913ba98093caa1c51be17a2dfdb389df",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    const imageUrl = res.data.images.map((e) => e.imageUrl);
    return imageUrl;
  } catch (error) {
    console.log("Can't get api", error);
  }
};

const container = document.getElementById("container");

const searchbutton = document.querySelector("button");
searchbutton.addEventListener("click", (e) => {
  e.preventDefault();
  if (dataFromUser !== "") {
    getSerperRes()
      .then((urlValue) => {
        container.innerHTML = "";
      let row = document.createElement("div");
        urlValue.forEach((element, index) => {
          if (index % 3 === 0) {
            row = document.createElement("div");
            row.classList.add("row");
            container.appendChild(row);
          }
          const imgTag = document.createElement("img");
          imgTag.src = element;
          row.appendChild(imgTag);
        });
      })
      .catch((err) => console.log(err));
  } else {
    console.log("No data");
  }
});

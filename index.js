var data = [];
let query = document.getElementById("query")?.value;

var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");

let page = 1;

async function get(q, page) {
  let res = await fetch(
    `https://api.imgur.com/3/gallery/search/top/all/${page}?q=${q}`,
    {
      method: "GET",
      headers: {
        Authorization: "Client-ID a80c4a71018c7c1",
      },
      mode: "cors",
    }
  );
  data = await res.json();
  return data;
}

async function home(page = 1) {
  let res = await fetch(
    `https://api.imgur.com/3/gallery/hot/${page}?showViral=true`,
    {
      method: "GET",
      headers: {
        Authorization: "Client-ID a80c4a71018c7c1",
      },
      mode: "cors",
    }
  );
  data = await res.json();
  setData(data.data);
  //return data;
}

const a = setTimeout(() => home(), 1000);

function searchThis() {
  one.innerHTML = "";
  two.innerHTML = "";
  three.innerHTML = "";
  four.innerHTML = "";
  five.innerHTML = "";

    search(query);
}

async function search(q, page = 1) {
  let query = q || document.getElementById("query").value;
  console.log(query, page);
  let got = await get(query, page);
  let main = got.data;
  console.log(main);

  setData(main);
}

async function setData(main) {
  console.log(main, "in setting datas");

  let x = 0;
  await main.map((a, i) => {
    if (a.images && a.images[0].type == "video/mp4") {
      console.log("Mp4", i);
    } else {
      x++;
      let div = document.createElement("div");
      div.setAttribute("class", "imgCard");
      let image = document.createElement("img");
      let desc = document.createElement("h4");
      let bot = document.createElement("div");
      image.src = `${a.images ? a.images[0].link : a.link}&mute=1`;
      image.setAttribute("class", "ima");

      desc.textContent = a.title;
      desc.setAttribute("class", "desc");
      bot.setAttribute("class", "bottom");
      let vote = document.createElement("div");
      let comment = document.createElement("div");
      let views = document.createElement("div");

      vote.innerHTML = `${a.ups - a.downs}`;
      comment.innerHTML = `${a.comment_count}`;
      views.innerHTML = `${(a.views / 1000).toFixed(1)}k`;
      bot.append(vote, comment, views);
      div.append(image, desc, bot);

      if (x % 5 == 0) {
        one.append(div);
      }
      if (x % 5 == 1) {
        two.append(div);
      }
      if (x % 5 == 2) {
        three.append(div);
      }
      if (x % 5 == 3) {
        four.append(div);
      }
      if (x % 5 == 4) {
        five.append(div);
      }
    }
  });
}

window.addEventListener("scroll", () => {
  let query = document.getElementById("query").value;
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    console.log(
      "Call func",
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 200
    );
    page++;
    search(query, page);
  }
});
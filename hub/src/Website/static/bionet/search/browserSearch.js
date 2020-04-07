(function ($) {
  let searchIndex = lunr.Index.load(index.index);
  let results;

  const body = document.querySelector(".container");

  const searchInput = document.createElement("input");
  const button = document.createElement("button");
  const resultsBox = document.createElement("ul");

  button.textContent = "Search";

  body.appendChild(searchInput);
  body.appendChild(button);
  body.appendChild(resultsBox);

  button.onclick = (e) => {
    resultsBox.innerHTML = "";
    let searchParam = searchInput.value;
    let results = searchIndex.search(searchParam);

    results.forEach((result) => {
      const item = data.store[result.ref];

      const li = document.createElement("li");
      const div = document.createElement("div");
      const a = document.createElement("a");
      a.href = item.href;
      a.target = "_BLANK";

      const h3 = document.createElement("h3");
      h3.textContent = item.title;

      a.appendChild(h3);

      div.appendChild(a);

      const p = document.createElement("p");
      p.textContent = item.content;

      div.appendChild(p);

      li.appendChild(div);

      resultsBox.appendChild(li);
    });
  };
})(jQuery);

export class Router {
  routes = {};
  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    if (window.location.pathname == "/exploration") {
      document.body.style.backgroundImage =
        "url(./assets/mountains-universe-3.png)";
    } else if (window.location.pathname == "/universe") {
      document.body.style.backgroundImage =
        "url(./assets/mountains-universe-2.png)";
    } else if (window.location.pathname == "/") {
      document.body.style.backgroundImage =
        "url(./assets/mountains-universe-1.png)";
    }

    console.log(window.location.pathname);
    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}

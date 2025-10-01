export interface Tweet {
  id: number;
  content: string | null;
  likes: number;
  timestamp: string;
  is_retweet: boolean;
  userLike: boolean;
  parent: Tweet | null;
  user: User;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export interface TweetListResponse {
  next: string | null;
  results: Tweet[];
}

export type TweetsCallback = (response: Tweet[], status: number) => void;
export type TweetListCallback = (
  response: TweetListResponse,
  status: number
) => void;
export type TweetCreateCallback = (response: Tweet, status: number) => void;

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function backendLookup<T>(
  method: "GET" | "POST" | "DELETE",
  endpoint: string,
  callback: (response: T, status: number) => void,
  data?: unknown
) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data);
  }
  const xhr = new XMLHttpRequest();
  const url = `http://localhost:8000/api${endpoint}`;
  xhr.responseType = "json";
  xhr.open(method, url);
  xhr.withCredentials = true;
  xhr.setRequestHeader("Content-Type", "application/json");

  if (method !== "GET") {
    const csrftoken = getCookie("csrftoken");
    if (csrftoken) {
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
  xhr.onload = function () {
    if (xhr.status === 403 && xhr.response) {
      const detail = xhr.response.detail;
      if (detail === xhr.response.detail) {
        if (window.location.href.indexOf("login") === -1)
          window.location.href =
            "http://localhost:8000/login?showLoginRequired=true";
      }
    }
    callback(xhr.response as T, xhr.status);
  };
  xhr.onerror = function () {
    console.log("erro na requisição");
    alert("There was an error");
  };
  xhr.send(jsonData);
}

import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import "./App.css";
import UserList from "./Components/UserList";

function App() {
  const [issueUrl, setIssueUrl] = useState("");
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState(null);

  console.log(issue, comments, users);

  const onSubmit = value => {
    setIssueUrl(value);
  };

  useEffect(() => {
    const doFetch = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${issueUrl}`
        );
        setIssue(await response.json());
      } catch (e) {
        console.error(e);
      }
    };
    if (issueUrl) {
      doFetch();
    }
  }, [issueUrl]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(issue.comments_url);
        setComments(await response.json());
      } catch (e) {
        console.error(e);
      }
    };
    if (issue) {
      getComments();
    }
  }, [issue]);

  useEffect(() => {
    const users = comments.reduce((acc, comment) => {
      if (acc.some(user => comment.user.id === user.id)) {
        return acc;
      }
      return [...acc, comment.user];
    }, []);
    if (comments.length) {
      setUsers(users);
    }
  }, [comments]);

  return (
    <div className="App">
      <SearchBar onSubmit={onSubmit} />
      <UserList users={[]} />
    </div>
  );
}

export default App;

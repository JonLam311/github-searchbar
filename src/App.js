import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import "./App.css";
import UserList from "./Components/UserList";
import CommentList from "./Components/CommentList";

function App() {
  const [issueUrl, setIssueUrl] = useState("");
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

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
        const commentsList = await response.json();

        const groupComments = [];
        commentsList.forEach(comment => {
          const lastItem = groupComments.length ? groupComments[groupComments.length - 1] : null;
          if (!lastItem || lastItem.user.id !== comment.user.id) {
            groupComments.push(comment);
          } else {
            lastItem.body += comment.body;
            lastItem.date = comment.date;
          }
        });

        setComments(groupComments);
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
      <div className="main">
        <UserList users={users} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}

export default App;

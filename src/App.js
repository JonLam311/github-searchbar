import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import "./App.css";
import UserList from "./Components/UserList";
import CommentList from "./Components/CommentList";

const App = () => {
  const [issueUrl, setIssueUrl] = useState("");
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  console.log(issue, comments, users);

  const onSubmit = value => {
    setIssueUrl(value)
  };
  
  const doFetch = async (url) => {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    if (issueUrl) {
      const getIssue = async () => {
        const issueGetted /** Greg <3 */ = await doFetch(issueUrl)
        setIssue(issueGetted)
      }
      getIssue()
    }
  }, [issueUrl]);
  
  useEffect(() => {
    const getComments = async () => {
        const commentsList = await doFetch(issue.comments_url)
        const groupComments = []
        commentsList.forEach(comment => {
          const lastItem = groupComments.length ? groupComments[groupComments.length - 1] : null
          if (!lastItem || lastItem.user.id !== comment.user.id) {
            groupComments.push(comment)
          } else {
            lastItem.body += comment.body
            lastItem.date = comment.date
          }
        });
        setComments(groupComments)
    };
    if (issue) {
      getComments()
    }
  }, [issue])

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

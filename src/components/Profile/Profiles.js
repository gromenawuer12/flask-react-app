import classes from "./Profiles.module.css";
import { useCallback, useEffect, useState } from "react";

const UserProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfilesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/users/test", {
        headers: { Authorization: "access_token " + token },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      console.log(data);
      /*
      const loadedProfiles = [];

      
      for (const key in data) {
        loadedProfiles.push({
          id: data.username,
          username: data.username,
          password: data.password,
          role: data.role,
        });
      }
      

      console.log(loadedProfiles);

      setProfiles(loadedProfiles);
      */
      setProfiles([data]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProfilesHandler();
  }, [fetchProfilesHandler]);

  return (
    <div className={classes.profile}>
      {profiles.map((user) => {
        return (
          <ul className={classes["horizontal-list"]}>
            <li>{user.username}</li>
            <li>{user.password}</li>
            <li>{user.role}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default UserProfile;

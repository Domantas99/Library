import React, { useState } from "react";
import { Button, TeamReservationsTable, UserReservationsTable } from "../../components";
import { useEffect } from "react";

const Reservations = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [activeComponent, setActiveComponent] = useState();

  useEffect(() => {
    const generateUserReservations = () => {
      return (
        <>
          <div className="panel__header">
            <h1>My reservations</h1>
          </div>
          <Button onClick={() => setActiveTab("user")}>My reservations</Button>
          <Button onClick={() => setActiveTab("team")}>Team reservations</Button>
          <UserReservationsTable />
        </>
      );
    };

    const generateTeamReservations = () => {
      return (
        <>
          <div className="panel__header">
            <h1>Team reservations</h1>
          </div>
          <Button onClick={() => setActiveTab("user")}>My reservations</Button>
          <Button onClick={() => setActiveTab("team")}>Team reservations</Button>
          <TeamReservationsTable/>
        </>
      );
    };
    switch (activeTab) {
      case "user": {
        setActiveComponent(generateUserReservations());
        return;
      }
      case "team": {
        setActiveComponent(generateTeamReservations());
        return;
      }
      default:
        setActiveComponent(null);
    }
  }, [activeTab]);

  return <div className="panel">{activeComponent}</div>;
};

export default Reservations;

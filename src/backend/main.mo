import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";

actor {
  type EditSettings = {
    trimIn : Nat;
    trimOut : Nat;
    mute : Bool;
    playbackSpeed : Float;
  };

  type Project = {
    name : Text;
    created : Time.Time;
    updated : Time.Time;
    settings : EditSettings;
  };

  module Project {
    public func compareByUpdated(project1 : Project, project2 : Project) : Order.Order {
      Int.compare(project2.updated, project1.updated);
    };
  };

  let projects = Map.empty<Text, Project>();

  public shared ({ caller }) func saveProject(name : Text, settings : EditSettings) : async () {
    let now = Time.now();
    let existing = projects.get(name);

    let newProject : Project = {
      name;
      created = switch (existing) {
        case (null) { now };
        case (?p) { p.created };
      };
      updated = now;
      settings;
    };

    projects.add(name, newProject);
  };

  public query ({ caller }) func getProject(name : Text) : async Project {
    switch (projects.get(name)) {
      case (null) { Runtime.trap("Project not found") };
      case (?project) { project };
    };
  };

  public query ({ caller }) func listProjectsView() : async [(Text, Time.Time)] {
    projects.toArray().map(
      func((name, project)) { (name, project.updated) }
    );
  };

  public query ({ caller }) func listProjects() : async [Project] {
    projects.values().toArray().sort(Project.compareByUpdated);
  };
};

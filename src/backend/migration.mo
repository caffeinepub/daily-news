import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import Principal "mo:core/Principal";

module {
  type Article = {
    id : Text;
    title : Text;
    summary : Text;
    category : Text;
    image : Text;
    featured : Bool;
    created : Time.Time;
  };

  type OldActor = {
    articles : Map.Map<Text, Article>;
    newsletterEmails : Map.Map<Text, ()>;
  };

  type UserProfile = {
    name : Text;
  };

  type NewActor = {
    articles : Map.Map<Text, Article>;
    newsletterEmails : Map.Map<Text, ()>;
    accessControlState : AccessControl.AccessControlState;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  func initializeUserProfiles() : Map.Map<Principal, UserProfile> {
    Map.empty<Principal, UserProfile>();
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      accessControlState = getAccessControlState();
      userProfiles = initializeUserProfiles();
    };
  };

  public func getAccessControlState() : AccessControl.AccessControlState {
    AccessControl.initState();
  };
};

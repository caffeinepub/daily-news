import Migration "migration";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Article = {
    id : Text;
    title : Text;
    summary : Text;
    category : Text;
    image : Text;
    featured : Bool;
    created : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  let articles = Map.empty<Text, Article>();
  let newsletterEmails = Map.empty<Text, ()>();

  // Seed articles
  let seedArticles : [Article] = [
    {
      id = "1";
      title = "Smart Contracts Revolutionize Finance";
      summary = "Explore how smart contracts are transforming the financial industry.";
      category = "Finance";
      image = "finance.jpg";
      featured = true;
      created = Time.now();
    },
    {
      id = "2";
      title = "Understanding Open Internet Protocols";
      summary = "A deep dive into the benefits and challenges of open Internet protocols.";
      category = "Technology";
      image = "technology.jpg";
      featured = false;
      created = Time.now();
    },
    {
      id = "3";
      title = "The Rise of Decentralized Apps";
      summary = "Learn why dApps are gaining popularity among developers.";
      category = "Development";
      image = "development.jpg";
      featured = true;
      created = Time.now();
    },
    {
      id = "4";
      title = "Smart Contracts in Real Estate";
      summary = "How they streamline property transactions safely and efficiently.";
      category = "Finance";
      image = "realestate.jpg";
      featured = false;
      created = Time.now();
    },
  ];

  func initializeArticles() {
    for (article in seedArticles.values()) {
      articles.add(article.id, article);
    };
  };

  // Article queries - accessible to all users including guests
  public query ({ caller }) func getLatestTopStories() : async [Article] {
    let now = Time.now();
    articles.values().toArray().filter(
      func(article) {
        article.created > (now - (7 * 24 * 60 * 60 * 1_000_000_000));
      }
    );
  };

  public query ({ caller }) func getFeaturedNews() : async [Article] {
    articles.values().toArray().filter(
      func(article) { article.featured }
    );
  };

  public query ({ caller }) func getArticlesByCategory(category : Text) : async [Article] {
    articles.values().toArray().filter(
      func(article) { article.category == category }
    );
  };

  public query ({ caller }) func getPaginatedArticles(start : Nat, count : Nat) : async [Article] {
    let allArticles = articles.values().toArray();
    let total = allArticles.size();
    if (start >= total) {
      return [];
    };
    let end = if (start + count > total) { total } else { start + count };
    Array.tabulate(
      end - start,
      func(i) { allArticles[start + i] },
    );
  };

  public shared ({ caller }) func subscribeNewsletter(email : Text) : async Bool {
    if (newsletterEmails.containsKey(email)) { return false };
    newsletterEmails.add(email, ());
    true;
  };

  public query ({ caller }) func getArticle(id : Text) : async ?Article {
    articles.get(id);
  };

  public query ({ caller }) func getNewsletterSubscribers() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view newsletter subscribers");
    };
    newsletterEmails.keys().toArray();
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: You can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};

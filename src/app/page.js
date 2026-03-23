import styles from "./page.module.css";
import Card from "../components/Card";
import Filter from "../components/Filters";
import Link from "next/link";

async function fetchTitles() {
  const response = await fetch(
    "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php",
    {
      next: { revalidate: 60 },
    },
  );
  const titles = await response.json();
  return titles ? titles.titles : [];
}
async function getData({ title, search }) {
  const response = await fetch(
    `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&limit=1000`,
    {
      next: { revalidate: 60 },
    },
  );
  const data = await response.json();
  return data ? data.profiles : [];
}
export const metaData = {
  title: "Profile App",
  description: "A profile app built with Next.js",
};
export default async function Home({ searchParams }) {
  const searchParamsData = await searchParams;
  const selectedTitle = searchParamsData && searchParamsData.title ? searchParamsData.title : "";
  const selectedSearch = searchParamsData && searchParamsData.search ? searchParamsData.search : "";
  const [titles, profiles] = await Promise.all([
    fetchTitles(),
    getData({ title: selectedTitle, search: selectedSearch }),
  ]);
  console.log(titles);

  return (
    <div>
        <h1>My Profiles App</h1>
        <Filter titles={titles} title={selectedTitle} search={selectedSearch} />
        <div className="grid">
        {profiles && profiles.length > 0
          ? profiles.map((profile) => (
            <Link key={profile.id} href={`/profile/${profile.id}`}> 
              <Card
                name={profile.name}
                title={profile.title}
                image={profile.image_url}
              />
              </Link>
            ))
          : <p>No profiles found.</p>}
          </div>
    </div>
  );
}
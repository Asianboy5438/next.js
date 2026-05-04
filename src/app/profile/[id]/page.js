import prisma from "@/app/lib/prisma";
import Link from "next/link";

async function fetchProfile(id) {
  const data = await prisma.profiles.findUnique({
    where: { id: parseInt(id) },
  });
  return data ? data : null;
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {  
    title: `Profile ${id}`,
    description: `Details of profile with ID ${id}`,
  };
};
export default async function ProfilePage({ params }) {
  const { id } = await params;
  console.log("Profile ID:", id);
  const profile = await fetchProfile(id);
  if (!profile) {
    return <p>Profile not found.</p>;
  }
  return (
    <div>
      <h1>{profile.name}</h1>
      <p style={{textAlign: "center"}}>Title: {profile.title}</p>
      <figure style={{ display: "flex", justifyContent: "center" }}>
        <img src={profile.image_url} alt={profile.name} style={{ maxWidth: "100%", height: "auto" }} />
      </figure>
      <Link href={`/profile/${profile.id}/edit`} style={{ display: "block", textAlign: "center", margin: "20px 0" }}>
        Edit Profile
      </Link>
    </div>
  );
}
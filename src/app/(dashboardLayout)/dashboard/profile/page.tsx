import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/modules/admin-panel/content-layout";
import ProfileCard from "@/components/modules/dashboard-components/profile/ProfileCard";
import ProfileUpdateForm from "@/components/modules/dashboard-components/profile/ProfileUpdateForm";
import PasswordChangeForm from "@/components/modules/dashboard-components/profile/PasswordChangeForm";
import ProfileImageUpload from "@/components/modules/dashboard-components/profile/ProfileImageUpload";
import { getMe } from "@/services/AuthServices";

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <ContentLayout title="MY PROFILE">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCard user={user} />
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              <TabsTrigger value="password">Change Password</TabsTrigger>
              <TabsTrigger value="image">Profile Image</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <ProfileUpdateForm user={user} />
            </TabsContent>

            <TabsContent value="password" className="mt-6">
              <PasswordChangeForm />
            </TabsContent>

            <TabsContent value="image" className="mt-6">
              <ProfileImageUpload
                userId={user?.id}
                currentImage={user?.profileImage}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}

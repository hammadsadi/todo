"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Upload, X, Camera } from "lucide-react";
// import { updateUserProfile } from "@/services/AuthServices";
// import uploadImage from "@/utils/imageUploadToCloudinary";

interface ProfileImageUploadProps {
  userId: string;
  currentImage: string | null;
}

export default function ProfileImageUpload({
  userId,
  currentImage,
}: ProfileImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // Validate file type
  //   if (!file.type.startsWith("image/")) {
  //     toast.error("Please select an image file");
  //     return;
  //   }

  //   // Validate file size (max 5MB)
  //   if (file.size > 5 * 1024 * 1024) {
  //     toast.error("Image size should be less than 5MB");
  //     return;
  //   }

  //   setSelectedFile(file);
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result as string);
  //   };
  //   fileReader.readAsDataURL(file);
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     toast.error("Please select an image first");
  //     return;
  //   }

  //   setIsLoading(true);
  //   const uploading = toast.loading("Uploading profile image...");

  //   try {
  //     // Use the uploadImage utility to get the Cloudinary URL
  //     const imageUrl = await uploadImage(selectedFile);

  //     if (!imageUrl) {
  //       toast.error("Failed to upload image to cloud storage", {
  //         id: uploading,
  //       });
  //       return;
  //     }

  //     // Now update the user profile with the image URL
  //     const response = await updateUserProfile(userId, {
  //       profileImage: imageUrl,
  //     });

  //     if (response.success) {
  //       toast.success("Profile image updated successfully", { id: uploading });
  //       // Reset selected file after successful upload
  //       setSelectedFile(null);
  //       // Update the preview with the new cloud URL
  //       setPreviewUrl(imageUrl);
  //     } else {
  //       toast.error(response.message || "Failed to update profile", {
  //         id: uploading,
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong", { id: uploading });
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const clearSelection = () => {
  //   setSelectedFile(null);
  //   setPreviewUrl(currentImage);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a new profile picture</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-6 relative group">
          <Avatar className="h-32 w-32">
            <AvatarImage src={previewUrl || undefined} alt="Profile" />
            <AvatarFallback className="bg-primary/20">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div
            className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-8 w-8 text-white" />
          </div>
        </div>

        <input
          title="Upload Image"
          type="file"
          accept="image/*"
          // onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        <div className="flex gap-4 mt-4">
          <Button
            className="dark:text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Image
          </Button>

          {selectedFile && (
            <>
              <Button
                variant="destructive"
                size="icon"
                // onClick={clearSelection}
              >
                <X className="h-4 w-4" />
              </Button>

              <Button
                className="dark:text-white"
                // onClick={handleUpload}
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </>
          )}
        </div>

        {selectedFile && (
          <p className="text-sm text-muted-foreground mt-4">
            Selected: {selectedFile.name} (
            {(selectedFile.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MyModal } from "@/components/modules/shared/MyModal/MyModal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { reviewCreate, updateReview } from "@/services/Review";
import { TReview } from "@/types/review.type";
import { Frown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateReview = ({ review }: { review: TReview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(review?.rating);
  const [hoverItem, setHoverItem] = useState(0);
  const [userReview, setUserReview] = useState("");

  // Handle Submit Review Comment
  const handleSubmitReviewComment = async () => {
    const submitReviewId = toast.loading("Submitting Review...");
    const modifiedData = {
      comment: userReview || review?.comment,
      rating: Number(rating),
    };
    try {
      const res = await updateReview(modifiedData, review?.id);
      if (res?.success) {
        toast.success(res?.message, { id: submitReviewId });
        setIsOpen(false);
      } else {
        toast.error(res?.message, { id: submitReviewId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: submitReviewId });
    }
  };

  return (
    <>
      <div className="flex flex-col max-w-xl p-4 rounded-xl lg:p-12 ">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-3xl font-semibold text-center">
            Your opinion matters!
          </h2>
          <div className="flex flex-col items-center py-4 space-y-2">
            <span className="text-center">How was your experience?</span>
            <div className="flex space-x-3">
              {[...Array(5)].map((Item, idx) => {
                const currentRating = idx + 1;
                return (
                  <label key={idx}>
                    <input
                      type="radio"
                      name="rating"
                      onClick={() => setRating(currentRating)}
                      value={currentRating}
                      className="hidden"
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onMouseEnter={() => setHoverItem(currentRating)}
                      onMouseLeave={() => setHoverItem(0)}
                      fill="currentColor"
                      className={
                        currentRating <= (hoverItem || rating)
                          ? "text-[#ffc107] w-10 h-10 cursor-pointer"
                          : "text-[#e4e5e9] w-10 h-10 cursor-pointer"
                      }
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Textarea
              onChange={(e) => setUserReview(e.target.value)}
              defaultValue={review?.comment}
              placeholder="Type your message here."
            />
            <Button onClick={handleSubmitReviewComment}>Submit</Button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-1">
          <Button
            onClick={() => setIsOpen(false)}
            variant="secondary"
            className="w-full"
          >
            Maybe later
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateReview;

"use client"

import type React from "react"

import { useState } from "react"
import { Star, Send, CarTaxiFrontIcon as Taxi, User, Clock, MapPin, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CabRating() {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>("")
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the rating data to your backend
    console.log({ rating, feedback })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <ThumbsUp className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle>Thank You!</CardTitle>
          <CardDescription className="text-base">
            Your feedback has been submitted successfully. We appreciate you taking the time to rate your ride.
          </CardDescription>
          <Button className="mt-4" onClick={() => setSubmitted(false)}>
            Rate Another Ride
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            <Taxi className="w-3 h-3 mr-1" /> Ride Complete
          </Badge>
          <span className="text-sm text-muted-foreground">Trip #12345</span>
        </div>
        <CardTitle className="text-xl">How was your ride?</CardTitle>
        <CardDescription>Please rate your experience with your driver</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16 border-2 border-muted">
              <AvatarImage src="/placeholder-user.jpg" alt="Driver" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">John Driver</h3>
              <div className="flex items-center text-sm text-muted-foreground gap-4 mt-1">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> 4.8
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 5+ years
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" /> Downtown to Airport
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <div className="text-sm font-medium mb-2">Rate your experience</div>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 transition-all ${
                      (hoveredRating ? star <= hoveredRating : star <= rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-center mt-2 text-sm font-medium">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="feedback" className="text-sm font-medium block mb-2">
              Additional comments (optional)
            </label>
            <Textarea
              id="feedback"
              placeholder="Tell us about your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button onClick={handleSubmit} className="w-full gap-2" disabled={rating === 0}>
          <Send className="w-4 h-4" /> Submit Rating
        </Button>
      </CardFooter>
    </Card>
  )
}


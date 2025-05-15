'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Testimonial {
  id: number;
  imgUrl: string;
}

const TestimonialMarquee = () => {
  const [isPaused] = useState<boolean>(false);
  const [speed] = useState<number>(2);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Sample testimonial images - in a real app these would come from props or API
  const testimonials: Testimonial[] = [
    { id: 1, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 2, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 3, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 4, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 5, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 6, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 7, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 8, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 9, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 10, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 11, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
    { id: 12, imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/05/Marketing.jpeg.jpg" },
  ];

  // Duplicate the testimonials to create the continuous effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Animation control - uses CSS animation API
  useEffect(() => {
    if (!scrollRef.current) return;

    // If paused, stop the animation
    if (isPaused) {
      scrollRef.current.style.animationPlayState = "paused";
    } else {
      scrollRef.current.style.animationPlayState = "running";
      scrollRef.current.style.animationDuration = `${30 / speed}s`;
    }
  }, [isPaused, speed]);

  // Function to toggle play/pause
  // const togglePause = () => {
  //   setIsPaused(!isPaused);
  // };

  // Function to adjust speed
  // const changeSpeed = () => {
  //   setSpeed((prevSpeed) => {
  //     if (prevSpeed >= 3) return 1;
  //     return prevSpeed + 1;
  //   });
  // };

  return (
    <div className="w-full overflow-hidden py-8 mt-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Fiable pour plus de 530 000 étudiants à travers le monde.
      </h2>

      {/* Controls */}


      {/* Marquee container */}
      <div className="relative w-full overflow-hidden">
        {/* Actual marquee element */}
        <div
          ref={scrollRef}
          className="flex whitespace-nowrap"
          style={{
            animation: `scroll ${30 / speed}s linear infinite`,
          }}>
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="inline-block px-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-32 md:w-40">
                <Image
                  width={200}
                  height={150}
                  src={testimonial.imgUrl}
                  alt={`Student testimonial`}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Include CSS animation keyframes */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialMarquee;

import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated shimmer circle */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-primary">
            🌙
          </span>
        </div>

        {/* Animated text with gradient shimmer */}
        <div className="relative text-lg font-medium">
          <span className="bg-gradient-to-r from-primary via-primary/60 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_2s_infinite]">
            Loading . . .
          </span>
        </div>

        {/* Subtext */}
        {/* <p className="text-sm text-muted-foreground animate-pulse">
          Preparing your settings & preferences
        </p> */}
      </div>
    </div>
  );
};

export default Loader;

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { format, startOfDay } from "date-fns";
import "react-day-picker/dist/style.css";
import { LuCalendarDays } from "react-icons/lu";

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  transform = true,
  restrict = false, // can be 'upcoming' | 'finished' | false
}) => {
  const [selectedRange, setSelectedRange] = useState({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  useEffect(() => {
    setSelectedRange({
      from: startDate ? new Date(startDate) : undefined,
      to: endDate ? new Date(endDate) : undefined,
    });
  }, [startDate, endDate]);

  const handleDateSelection = (range) => {
    setSelectedRange(range);

    if (range?.from) {
      setStartDate(format(range.from, "yyyy-MM-dd"));
    } else {
      setStartDate(null); // Or reset if no start date
    }

    if (range?.to) {
      setEndDate(format(range.to, "yyyy-MM-dd"));
    } else if (range?.from) {
      // If only one date selected (like a single click)
      setEndDate(format(range.from, "yyyy-MM-dd"));
    } else {
      setEndDate(null); // Or reset if no end date
    }
  };

  const formatRange = () => {
    const { from, to } = selectedRange || {};

    try {
      if (from && to)
        return `${format(from, "MMM dd")} - ${format(to, "MMM dd")}`;
      if (from) return format(from, "MMM dd");
      return "Date Range";
    } catch {
      return "Date Range";
    }
  };

  const today = startOfDay(new Date());
  let disabledRange = undefined;

  if (restrict === "Upcoming Races") {
    disabledRange = { before: today };
  } else if (restrict === "Finished Races") {
    disabledRange = { after: today };
  }

  const Calendar = (
    <DayPicker
      mode="range"
      selected={selectedRange}
      onSelect={handleDateSelection}
      numberOfMonths={1}
      disabled={disabledRange}
      modifiersStyles={{
        today: {
          color: "black",
          backgroundColor: "white",
          borderRadius: "50%",
        },
      }}
    />
  );

  if (!transform) {
    // Square input style
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between px-5 py-2 bg-[#e5f4ff] dark:bg-[#001B4E] border border-gray-300 dark:border-[#00387E] rounded-md text-sm dark:text-white text-slate-700 cursor-pointer">
            <span className="truncate">
              {formatRange() || "Select Date Range"}
            </span>
            <LuCalendarDays className="ml-3" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-4 bg-[#e5f4ff] dark:bg-[#002760] rounded-md shadow-lg z-20">
          {Calendar}
        </PopoverContent>
      </Popover>
    );
  }

  // Default pill-style trigger
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex dark:text-white text-slate-700 justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
          bg-[#e5f4ff] dark:bg-transparent dark:border dark:border-[#00387E]`}
        >
          {formatRange()}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 bg-[#e5f4ff] dark:bg-[#002760] rounded-md shadow-lg z-20">
        {Calendar}
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;

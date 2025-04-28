// components/DateRangePicker.jsx
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [selectedRange, setSelectedRange] = useState({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  const handleDateSelection = (range) => {
    setSelectedRange(range);
    if (range.from) setStartDate(format(range.from, "yyyy-MM-dd"));
    if (range.to) setEndDate(format(range.to, "yyyy-MM-dd"));
  };

  const formatRange = () => {
    const { from, to } = selectedRange;
    if (from && to) return `${format(from, "MMM dd")} - ${format(to, "MMM dd")}`;
    if (from) return format(from, "MMM dd");
    return "Date Range";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex dark:text-white justify-center items-center px-[0.9rem] py-[0.76rem] rounded-[70px] shadow-xl font-semibold text-[0.6rem] md:text-[0.94rem] 
          bg-white dark:bg-transparent dark:border dark:border-[#00387E]`}
        >
          {formatRange()}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 bg-white dark:bg-[#002760] rounded-md shadow-lg z-20">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleDateSelection}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;

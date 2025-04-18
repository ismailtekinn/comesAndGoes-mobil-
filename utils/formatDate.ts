type FormatDateOptions = {
    use12HourFormat?: boolean;
    locale?: string;
  };
  
  export const formatDate = (
    dateString: string,
    options?: FormatDateOptions
  ): string => {
    const {
      use12HourFormat = false,
      locale = "tr-TR",
    } = options || {};
  
    const date = new Date(dateString);
  
    return date.toLocaleString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: use12HourFormat,
    });
  };
  
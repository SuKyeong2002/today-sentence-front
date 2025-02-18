// 12시간제로 변환
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, 
    })
      .format(date)
      .replace(/\./g, "") 
      .replace(" ", ". ") 
      .replace(",", ""); 
  };
  
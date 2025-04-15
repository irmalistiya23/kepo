export const dashboardAPI = {
  fetchDataAnalisis : async () => {
    try {
      const response = await fetch('http://localhost:3001/api/analisis/1');
      const result = await response.json();
      return result
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
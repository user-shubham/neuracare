// src/components/Sections/Insights/ChartRenderer.jsx
import { 
    LineChart, Line, BarChart, Bar, PieChart, Pie, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
    ResponsiveContainer, Cell 
  } from 'recharts';
  
  const ChartRenderer = ({ 
    type, 
    data, 
    xKey, 
    yKey, 
    nameKey, 
    dataKey, 
    colorKey,
    timeframe
  }) => {
    // Filter data based on timeframe if needed
    const chartData = data;
  
    const renderChart = () => {
      switch (type) {
        case 'line':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey={xKey} 
                  tick={{ fill: '#6B7280' }} 
                  axisLine={{ stroke: '#E5E7EB' }} 
                  tickLine={false} 
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }} 
                  axisLine={{ stroke: '#E5E7EB' }} 
                  tickLine={false} 
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    border: 'none'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey={yKey} 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5', r: 4 }}
                  activeDot={{ r: 6, fill: '#4F46E5', stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          );
        
        case 'bar':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey={xKey} 
                  tick={{ fill: '#6B7280' }} 
                  axisLine={{ stroke: '#E5E7EB' }} 
                  tickLine={false} 
                />
                <YAxis 
                  tick={{ fill: '#6B7280' }} 
                  axisLine={{ stroke: '#E5E7EB' }} 
                  tickLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    border: 'none'
                  }} 
                />
                <Bar 
                  dataKey={yKey} 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]}
                  barSize={36}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${210 + index * 15}, 80%, 70%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          );
        
        case 'pie':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey={dataKey}
                  nameKey={nameKey}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry[colorKey] || `hsl(${210 + index * 30}, 80%, 70%)`} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    border: 'none'
                  }} 
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          );
        
        default:
          return <p>Chart type not supported</p>;
      }
    };
  
    return (
      <div className="w-full h-full">
        {renderChart()}
      </div>
    );
  };
  
  export default ChartRenderer;
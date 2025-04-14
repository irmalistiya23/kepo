'use client';

import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import Image from 'next/image';
import './index.css';

const COLORS = ["#FF8042", "#00C49F"];

export default function Analisis() {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    weeklyData: [],
    pieData: [],
    incomeChange: 0,
    expenseChange: 0,
    balanceChange: 0,
    lastUpdated: new Date(),
    expenseCategories: [
      { name: 'Listrik', amount: 500000, percentage: 25, dueDate: new Date(2024, 3, 15) },
      { name: 'Internet', amount: 300000, percentage: 15, dueDate: new Date(2024, 3, 20) },
      { name: 'Bahan Bakar', amount: 400000, percentage: 20, dueDate: new Date(2024, 3, 25) },
      { name: 'Makanan', amount: 600000, percentage: 30, dueDate: new Date(2024, 3, 10) },
      { name: 'Lainnya', amount: 200000, percentage: 10, dueDate: new Date(2024, 3, 30) }
    ],
    paidCategories: [
      { name: 'Air', amount: 250000, percentage: 15, paidDate: new Date(2024, 3, 5) },
      { name: 'Telepon', amount: 150000, percentage: 10, paidDate: new Date(2024, 3, 8) },
      { name: 'Transportasi', amount: 350000, percentage: 20, paidDate: new Date(2024, 3, 12) }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/analisis/1');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const sisaUang = data.totalIncome - data.totalExpense;
  
  // Format the date to show "Hari ini" or the actual date
  const formatDate = (date: Date) => {
    const today = new Date();
    const dataDate = new Date(date);
    
    // Check if the date is today
    if (dataDate.toDateString() === today.toDateString()) {
      return "Hari ini";
    }
    
    // Format the date as "DD MMMM YYYY"
    return dataDate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Prepare data for the pie chart
  const pieChartData = [
    { name: 'Pemasukan', value: data.totalIncome },
    { name: 'Pengeluaran', value: data.totalExpense }
  ];

  // Custom colors for the pie chart
  const pieColors = ['#F97316', '#FB923C'];

  // Function to calculate days until due date
  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to format countdown text
  const formatCountdown = (days: number) => {
    if (days < 0) return 'Terlambat';
    if (days === 0) return 'Hari ini';
    if (days === 1) return 'Besok';
    if (days < 7) return `${days} hari lagi`;
    if (days < 30) return `${Math.floor(days / 7)} minggu lagi`;
    return `${Math.floor(days / 30)} bulan lagi`;
  };

  return (
    <div className="analisis-container">
      <div className="analisis-pattern"></div>
      <div className="analisis-content">
        <div className="analisis-header">
          <h2 className="analisis-title">
            Analisis & Laporan
          </h2>
          <div className="analisis-timestamp">
            <span className="analisis-timestamp-icon">🕒</span>
            <span className="analisis-timestamp-text">Data terakhir: {formatDate(data.lastUpdated)}</span>
          </div>
        </div>

        {/* Kartu Info */}
        <div className="analisis-cards">
          <div className="analisis-card analisis-card-income">
            <div className="analisis-card-header">
              <p className="analisis-card-label">Pemasukan</p>
              <div className="analisis-card-icon">
                <Image 
                  src="/images/coins.png" 
                  alt="Pemasukan" 
                  width={150} 
                  height={150}
                  className="analisis-card-icon-image"
                />
              </div>
            </div>
            <h3 className="analisis-card-value">RP {data.totalIncome.toLocaleString()}</h3>
            <div className={`analisis-card-change ${data.incomeChange >= 0 ? 'positive' : 'negative'}`}>
              {data.incomeChange >= 0 ? '↑' : '↓'} {Math.abs(data.incomeChange)}%
            </div>
          </div>
          <div className="analisis-card analisis-card-expense">
            <div className="analisis-card-header">
              <p className="analisis-card-label">Pengeluaran</p>
              <div className="analisis-card-icon">
                <div className="analisis-pie-chart-container">
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <h3 className="analisis-card-value">RP {data.totalExpense.toLocaleString()}</h3>
            <div className={`analisis-card-change ${data.expenseChange >= 0 ? 'positive' : 'negative'}`}>
              {data.expenseChange >= 0 ? '↑' : '↓'} {Math.abs(data.expenseChange)}%
            </div>
          </div>
          <div className="analisis-card analisis-card-balance">
            <div className="analisis-card-header">
              <p className="analisis-card-label">Sisa Uang</p>
              <div className="analisis-card-icon">
                <Image 
                  src="/images/coins2.png" 
                  alt="Sisa Uang" 
                  width={150} 
                  height={150}
                  className="analisis-card-icon-image"
                />
              </div>
            </div>
            <h3 className="analisis-card-value">RP {sisaUang.toLocaleString()}</h3>
            <div className={`analisis-card-change ${data.balanceChange >= 0 ? 'positive' : 'negative'}`}>
              {data.balanceChange >= 0 ? '↑' : '↓'} {Math.abs(data.balanceChange)}%
            </div>
          </div>
        </div>

        {/* Statistik Mingguan */}
        <div className="analisis-section">
          <h3 className="analisis-section-title">
            <span className="analisis-section-title-text">Statistik</span>
          </h3>
          <div className="analisis-chart-container">
            <div className="analisis-chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#666"
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#666"
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={{ fill: '#F97316', strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={1}/>
                      <stop offset="95%" stopColor="#FB923C" stopOpacity={1}/>
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="analisis-expense-categories">
              <h4 className="analisis-expense-categories-title">Kategori Pengeluaran</h4>
              <ul className="analisis-expense-categories-list">
                {data.expenseCategories.map((category, index) => {
                  const daysUntilDue = getDaysUntilDue(category.dueDate);
                  const countdownText = formatCountdown(daysUntilDue);
                  return (
                    <li key={index} className="analisis-expense-category">
                      <div className="analisis-expense-category-info">
                        <div className="analisis-expense-category-details">
                          <span className="analisis-expense-category-name">{category.name}</span>
                          <span className="analisis-expense-category-countdown">
                            {countdownText}
                          </span>
                        </div>
                        <span className="analisis-expense-category-amount">Rp {category.amount.toLocaleString()}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="analisis-section">
          <h3 className="analisis-section-title">
            <span className="analisis-section-title-text">Perbandingan Pengeluaran dan Sisa Uang</span>
          </h3>
          <div className="analisis-pie-container">
            <div className="analisis-pie-chart">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label={({ name, percent }) => (
                      <text
                        x={0}
                        y={0}
                        dy={20}
                        textAnchor="middle"
                        fill="#4B5563"
                        className="font-semibold"
                      >
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                  >
                    {data.pieData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity duration-300"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => (
                      <span className="text-gray-700 font-medium">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="analisis-paid-categories">
              <h4 className="analisis-paid-categories-title">Kategori yang Sudah Dibayar</h4>
              <ul className="analisis-paid-categories-list">
                {data.paidCategories.map((category, index) => (
                  <li key={index} className="analisis-paid-category">
                    <div className="analisis-paid-category-info">
                      <div className="analisis-paid-category-details">
                        <span className="analisis-paid-category-name">{category.name}</span>
                        <span className="analisis-paid-category-date">
                          Dibayar: {formatDate(category.paidDate)}
                        </span>
                      </div>
                      <span className="analisis-paid-category-amount">Rp {category.amount.toLocaleString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Title from '../general/Title';
import ApexCharts from 'react-apexcharts';
import { c_color } from './chartTitleColors';
import { ConfigWithToken, ManagerBaseApi } from '../../auth/authConfig';
import { useQuery } from 'react-query';
import { getIngredientsInfo } from '../../api/apis';
import { useEffect } from 'react';
import axios from 'axios';

const FoodSavingStatusChart = () => {
  const config = ConfigWithToken();

  useEffect(() => {
    axios
      .get(`${ManagerBaseApi}/state/predict/menu`, config)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Title>
        <span style={c_color}>금주 식재료 절약 현황</span>
      </Title>
      <ApexCharts
        type="line"
        series={[
          {
            name: '서비스 기반 예상 총 식재료 양',
            data: [24, 35, 5, 30, 12],
            type: 'column',
          },
          {
            name: '매출액 기반 예상 총 식재료 양',
            data: [44, 55, 11, 66, 25],
            type: 'line',
          },
        ]}
        height={270}
        options={{
          chart: {
            type: 'line',
            toolbar: { show: false },
            stacked: false,
          },
          zoom: {
            enabled: false,
          },
          stroke: {
            width: [1, 4],
            colors: ['#fff', '#FEB019'],
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          xaxis: {
            categories: ['월', '화', '수', '목', '금'],
          },
          yaxis: {
            labels: {
              formatter: (val) => {
                return val + 'kg';
              },
            },
          },
          fill: {
            opacity: 1,
          },
          colors: ['#008FFB', '#FEB019'],
          legend: {
            position: 'top',
            horizontalAlign: 'right',
          },
        }}
      />
    </>
  );
};

export default FoodSavingStatusChart;
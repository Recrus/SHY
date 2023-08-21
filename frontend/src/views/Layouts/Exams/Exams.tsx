import React, { useEffect, useState } from "react";
import axiosFetch from "../../../plugins/axios";
import {
    AnalyticsDataAdmin,
    Exam,
    ExamAnalyticsAdmin,
    ExamAnalyticsEmployee,
    RadarDataPoint,
} from "../../../../types/types";
import ExamCard from "../../../components/UI/Exams/ExamCard/ExamCard";
import TheExamSkeleton from "../../../components/UI/Exams/ExamCard/TheExamSkeleton";
import ExamOverview from "../../../components/UI/Exams/ExamCard/ExamOverview";
import { useStateContext } from "../../../context/StateContext";

const Exams = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [avgPerformance, setAvgPerformance] = useState<number | undefined>(
        undefined,
    );
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [passedRate, setPassedRate] = useState(0);
    const [radarData, setRadarData] = useState<RadarDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(1);
    const { user } = useStateContext();
    const role = user?.role_id;
    const PLACEHOLDER_ROWS = 5;

    const getColorClass = (avgMark: number): string => {
        if (avgMark === 0 || avgMark === undefined) return "bg-gray";
        if (avgMark <= 3) return "bg-red-500";
        if (avgMark < 4) return "bg-yellow-700";
        if (avgMark <= 5) return "bg-green-500";
        return "bg-gray-300";
    };

    useEffect(() => {
        const fetchExamsData = async (): Promise<Exam[]> => {
            const response = await axiosFetch.get("/exams");
            return response.data.data;
        };

        const mapAnalyticsDataEmployee = (
            analyticsData: ExamAnalyticsEmployee[],
        ): Record<number, ExamAnalyticsEmployee> => {
            const analyticsMap: Record<number, ExamAnalyticsEmployee> = {};
            analyticsData.forEach((item) => {
                analyticsMap[item.exam_id] = item;
            });
            return analyticsMap;
        };

        const fetchDataEmployee = async (examsData: Exam[]) => {
            try {
                const analytics = await axiosFetch.get(
                    `/user/${user?.id}/exams`,
                );
                const analyticsData: ExamAnalyticsEmployee[] =
                    analytics.data.data;
                const analyticsMap = mapAnalyticsDataEmployee(analyticsData);

                const combinedData = examsData.map((exam) => {
                    const examAnalytics = analyticsMap[exam.id] || {};
                    return {
                        ...exam,
                        avgMark: examAnalytics.mark,
                        is_accepted: examAnalytics.is_accepted,
                        colorClass: getColorClass(examAnalytics.mark),
                    };
                });

                const totalAvgMarks = combinedData.reduce(
                    (sum, exam) => (exam.avgMark ? sum + exam.avgMark : sum),
                    0,
                );
                const successfulExams = analyticsData.reduce(
                    (sum, exam) => (exam.is_accepted ? sum + 1 : sum),
                    0,
                );

                setExams(combinedData);
                setTotalAttempts(analyticsData.length);
                setAvgPerformance(totalAvgMarks * 10);
                setPassedRate(successfulExams);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        const mapAnalyticsDataAdmin = (
            analyticsData: AnalyticsDataAdmin,
        ): Record<number, ExamAnalyticsAdmin> => {
            const analyticsMap: Record<number, ExamAnalyticsAdmin> = {};
            analyticsData.exams.forEach((item) => {
                analyticsMap[item.exam_id] = item;
            });
            return analyticsMap;
        };

        const fetchDataAdmin = async (examsData: Exam[]) => {
            try {
                const analytics = await axiosFetch.get("/exams-analytics");
                const analyticsData: AnalyticsDataAdmin = analytics.data;

                const analyticsMap = mapAnalyticsDataAdmin(analyticsData);

                const combinedData = examsData.map((exam) => {
                    const examAnalytics = analyticsMap[exam.id] || {};
                    return {
                        ...exam,
                        avgMark: examAnalytics.average_mark,
                        examAttempts: examAnalytics.exam_total_attempts,
                        colorClass: getColorClass(examAnalytics.average_mark),
                    };
                });

                const radarChartData = combinedData.map((exam) => ({
                    tech: exam.name,
                    attempts: exam.examAttempts || 0,
                }));

                const totalAvgMarks = combinedData.reduce(
                    (sum, exam) => sum + exam.avgMark,
                    0,
                );
                const nonZeroAvgExams = combinedData.filter(
                    (exam) => exam.avgMark !== 0,
                );
                const mappedAvgPerformance =
                    Math.floor((totalAvgMarks * 20) / nonZeroAvgExams.length) ||
                    0;

                setExams(combinedData);
                setRadarData(radarChartData);
                setTotalAttempts(analyticsData.total_attempts);
                setPassedRate(analyticsData.total_success_rate);
                setAvgPerformance(mappedAvgPerformance);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        const initFetch = async () => {
            try {
                const examsData = await fetchExamsData();
                if (role === 1) {
                    fetchDataAdmin(examsData);
                } else if (role === 3) {
                    fetchDataEmployee(examsData);
                }
            } catch (e) {
                console.log(e);
            }
        };

        initFetch();
    }, [refetch]);

    return (
        <div>
            <div className="grid grid-cols-3 px-8">
                <div className="flex flex-col lg:col-span-2 col-span-3">
                    {loading
                        ? Array.from(
                              { length: PLACEHOLDER_ROWS },
                              (_, index) => (
                                  <div key={index}>
                                      <TheExamSkeleton />
                                  </div>
                              ),
                          )
                        : exams.map((exam) => (
                              <ExamCard
                                  exam={exam}
                                  setRefetch={setRefetch}
                                  key={exam.id}
                              />
                          ))}
                </div>
                <div className="hidden lg:block">
                    <ExamOverview
                        loading={loading}
                        avgPerformance={avgPerformance}
                        passedRate={passedRate}
                        radarData={radarData}
                        totalAttempts={totalAttempts}
                        role={role}
                        setRefetch={setRefetch}
                    />
                </div>
            </div>
        </div>
    );
};

export default Exams;

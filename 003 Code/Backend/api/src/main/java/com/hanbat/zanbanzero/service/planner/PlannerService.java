package com.hanbat.zanbanzero.service.planner;

import com.hanbat.zanbanzero.dto.planner.PlannerDto;
import com.hanbat.zanbanzero.entity.planner.Planner;
import com.hanbat.zanbanzero.exception.controller.exceptions.WrongParameter;
import com.hanbat.zanbanzero.repository.planner.PlannerRepository;
import com.hanbat.zanbanzero.service.DateTools;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlannerService {

    private final PlannerRepository repository;

    @Transactional
    public void setPlanner(PlannerDto dto, int year, int month, int day) {
        String dateString = DateTools.makeDateString(year, month, day);

        Planner planner = repository.findOnePlanner(dateString);
        if (planner == null) {
            dto.setDate(dateString);
            dto.setOff(false);

            repository.save(Planner.createPlanner(dto));
        }
        else {
            planner.setMenus(dto.getMenus());
        }
    }

    @Transactional
    public void setOff(PlannerDto dto, int year, int month, int day) {
        String dateString = DateTools.makeDateString(year, month, day);

        Planner planner = repository.findOnePlanner(dateString);
        if (planner == null) {
            dto.setDate(dateString);
            repository.save(Planner.createPlanner(dto));
        }
        else {
            planner.setOff(dto.isOff());
        }
    }

    public PlannerDto getOnePlanner(int year, int month, int day) {
        String date = DateTools.makeDateString(year, month, day);
        Planner planner = repository.findOnePlanner(date);
        if (planner == null) return null;

        return PlannerDto.createPlannerDto(planner);
    }

    public List<PlannerDto> getPlanner(int year, int month) throws WrongParameter {
        if (0 >= month || month > 12) throw new WrongParameter("잘못된 입력입니다.");

        String start = DateTools.makeDateString(year, month, 1);
        String end = DateTools.makeDateString(year, month, DateTools.getLastDay(year, month));

        List<Planner> result = repository.findAllByDateBetween(start, end);
        return result.stream()
                .map(planner -> PlannerDto.createPlannerDto(planner))
                .collect(Collectors.toList());
    }
}
